
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title DeepChainStaking
 * @dev Staking contract for DeepChain tokens
 */
contract DeepChainStaking is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Token being staked
    IERC20 public stakingToken;
    
    // Reward distribution parameters
    uint256 public rewardRate = 10; // 10% annual reward rate
    uint256 public constant REWARD_PRECISION = 1000; // For calculating rewards
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    
    // Staking parameters
    uint256 public minimumStakingPeriod = 7 days; // Minimum staking period
    uint256 public earlyWithdrawalFee = 50; // 5% fee for early withdrawal
    uint256 public totalStaked;
    
    // User staking data
    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 userRewardPerTokenPaid;
        uint256 rewards;
    }
    
    mapping(address => StakeInfo) public stakes;
    
    // Events
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardRateUpdated(uint256 newRate);
    
    /**
     * @dev Constructor that initializes the staking contract
     * @param _stakingToken Address of the token to stake
     * @param initialOwner Address of the initial owner
     */
    constructor(address _stakingToken, address initialOwner) Ownable(initialOwner) {
        stakingToken = IERC20(_stakingToken);
    }
    
    /**
     * @dev Updates reward variables
     */
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        
        if (account != address(0)) {
            stakes[account].rewards = earned(account);
            stakes[account].userRewardPerTokenPaid = rewardPerTokenStored;
        }
        _;
    }

    /**
     * @dev Calculates the reward per token
     */
    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        
        uint256 timeElapsed = block.timestamp - lastUpdateTime;
        uint256 reward = (timeElapsed * rewardRate * 1e18) / (365 days * REWARD_PRECISION);
        return rewardPerTokenStored + reward;
    }
    
    /**
     * @dev Calculates earned rewards for an account
     */
    function earned(address account) public view returns (uint256) {
        StakeInfo storage stakeInfo = stakes[account];
        uint256 currentRewardPerToken = rewardPerToken();
        uint256 rewardsDiff = currentRewardPerToken - stakeInfo.userRewardPerTokenPaid;
        
        return stakeInfo.rewards + (stakeInfo.amount * rewardsDiff / 1e18);
    }
    
    /**
     * @dev Stakes tokens
     * @param amount Amount to stake
     */
    function stake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot stake 0");
        
        // Update staking info
        StakeInfo storage stakeInfo = stakes[msg.sender];
        stakeInfo.amount += amount;
        stakeInfo.startTime = block.timestamp;
        totalStaked += amount;
        
        // Transfer tokens to the contract
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
        
        emit Staked(msg.sender, amount);
    }
    
    /**
     * @dev Withdraws staked tokens
     * @param amount Amount to withdraw
     */
    function withdraw(uint256 amount) external nonReentrant updateReward(msg.sender) {
        StakeInfo storage stakeInfo = stakes[msg.sender];
        require(amount > 0, "Cannot withdraw 0");
        require(stakeInfo.amount >= amount, "Withdraw amount exceeds balance");
        
        uint256 withdrawAmount = amount;
        // Check if early withdrawal
        if (block.timestamp < stakeInfo.startTime + minimumStakingPeriod) {
            uint256 fee = (amount * earlyWithdrawalFee) / REWARD_PRECISION;
            withdrawAmount = amount - fee;
        }
        
        // Update staking info
        stakeInfo.amount -= amount;
        totalStaked -= amount;
        
        // Transfer tokens
        stakingToken.safeTransfer(msg.sender, withdrawAmount);
        
        emit Withdrawn(msg.sender, withdrawAmount);
    }
    
    /**
     * @dev Claims rewards
     */
    function claimReward() external nonReentrant updateReward(msg.sender) {
        StakeInfo storage stakeInfo = stakes[msg.sender];
        uint256 reward = stakeInfo.rewards;
        
        require(reward > 0, "No rewards to claim");
        
        stakeInfo.rewards = 0;
        
        // Transfer rewards
        stakingToken.safeTransfer(msg.sender, reward);
        
        emit RewardPaid(msg.sender, reward);
    }
    
    /**
     * @dev Updates the reward rate
     * @param newRate New reward rate
     */
    function setRewardRate(uint256 newRate) external onlyOwner {
        require(newRate <= 300, "Rate too high"); // Max 30%
        rewardRate = newRate;
        emit RewardRateUpdated(newRate);
    }
    
    /**
     * @dev Sets the minimum staking period
     * @param period New minimum staking period in seconds
     */
    function setMinimumStakingPeriod(uint256 period) external onlyOwner {
        require(period <= 365 days, "Period too long");
        minimumStakingPeriod = period;
    }
    
    /**
     * @dev Sets the early withdrawal fee
     * @param fee New fee in tenths of a percent (e.g., 50 = 5%)
     */
    function setEarlyWithdrawalFee(uint256 fee) external onlyOwner {
        require(fee <= 300, "Fee too high"); // Max 30%
        earlyWithdrawalFee = fee;
    }
}
