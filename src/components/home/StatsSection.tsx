
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Users, BarChart3, LineChart } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';

// Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface StatsSectionProps {
  stats: {
    totalValue: string;
    activeUsers: string;
    totalTransactions: string;
    avgGasPrice: string;
  };
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <section className="py-12 relative">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeIn}>
            <StatCard
              title="Total Value Locked"
              value={stats.totalValue}
              icon={<Database className="h-6 w-6" />}
              trend={4.2}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Active Users"
              value={stats.activeUsers}
              icon={<Users className="h-6 w-6" />}
              trend={6.8}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Total Transactions"
              value={stats.totalTransactions}
              icon={<BarChart3 className="h-6 w-6" />}
              trend={3.5}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Average Gas Price"
              value={stats.avgGasPrice}
              icon={<LineChart className="h-6 w-6" />}
              trend={-2.1}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
