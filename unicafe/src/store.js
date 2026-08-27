import { create } from 'zustand';

const useStatsStore = create(set => ({
  stats: {
    good: 26,
    neutral: 40,
    bad: 0.3,
  },
  actions: {
    vote: (feedback) => set(state => {
      if (feedback === 'good') {
        return { good: state.stats.good + 1 };
      } else if (feedback === 'neutral') {
        return { neutral: state.stats.neutral + 1 };
      } else if (feedback === 'bad') {
        return { bad: state.stats.bad + 1 };
      }
    })
  }
}));

export const useStats = () => useStatsStore(state => state.stats);