
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DeepChainToken
 * @dev ERC20 Token for DeepChain platform
 */
contract DeepChainToken is ERC20, ERC20Burnable, Ownable {
    uint256 private constant MAX_SUPPLY = 100_000_000 * 10 ** 18; // 100 million tokens
    uint256 private _totalBurned;

    // Events
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    /**
     * @dev Constructor that initializes the token with name and symbol
     * @param initialOwner The initial owner of the contract
     */
    constructor(address initialOwner) 
        ERC20("DeepChain", "DPC") 
        Ownable(initialOwner) 
    {
        // Initial supply minted to owner (10% of total)
        _mint(initialOwner, 10_000_000 * 10 ** 18);
    }

    /**
     * @dev Mints new tokens
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds maximum token supply");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Burns tokens from the caller's account
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) public override {
        super.burn(amount);
        _totalBurned += amount;
        emit TokensBurned(_msgSender(), amount);
    }

    /**
     * @dev Burns tokens from a specific account
     * @param account Account to burn tokens from
     * @param amount Amount of tokens to burn
     */
    function burnFrom(address account, uint256 amount) public override {
        super.burnFrom(account, amount);
        _totalBurned += amount;
        emit TokensBurned(account, amount);
    }

    /**
     * @dev Returns the maximum token supply
     */
    function maxSupply() public pure returns (uint256) {
        return MAX_SUPPLY;
    }

    /**
     * @dev Returns the total amount of tokens that have been burned
     */
    function totalBurned() public view returns (uint256) {
        return _totalBurned;
    }

    /**
     * @dev Returns the remaining tokens that can be minted
     */
    function remainingSupply() public view returns (uint256) {
        return MAX_SUPPLY - totalSupply();
    }
}
