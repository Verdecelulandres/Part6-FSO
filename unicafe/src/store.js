import { create } from 'zustand';

const useStatsStore = create(set => ({
  stats: {
    good: 0,
    neutral: 0,
    bad: 0,
  },
  actions: {
    vote: (feedback) => set(state => {
      
      if (feedback === 'good') {     
        return { stats: { ...state.stats, good: state.stats.good + 1 } };
      } else if (feedback === 'neutral') {
        return { stats: { ...state.stats, neutral: state.stats.neutral + 1 } };
      } else if (feedback === 'bad') {
        return { stats: { ...state.stats, bad: state.stats.bad + 1 } };
      }
    })
  }
}));

export const useStats = () => useStatsStore(state => state.stats);
export const useStatsControls = () => useStatsStore(state => state.actions);