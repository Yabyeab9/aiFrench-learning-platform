import { describe, it, expect, beforeEach } from 'vitest';
import { useRoadmapStore } from './roadmap.store';

describe('roadmap store', () => {
  beforeEach(() => {
    // reset store to fallback state
    const { setLevels } = useRoadmapStore.getState();
    setLevels(Array.from({ length: 6 }).map((_, i) => ({
      level: i + 1,
      unlocked: i === 0,
      completed: false,
      xpRequired: 100,
      userXp: 0,
    })));
  });

  it('marks current level complete and unlocks next', () => {
    const { levels, markCompleteAndUnlockNext } = useRoadmapStore.getState();
    expect(levels[0].unlocked).toBe(true);
    expect(levels[1].unlocked).toBe(false);
    markCompleteAndUnlockNext(1);
    const after = useRoadmapStore.getState().levels;
    expect(after[0].completed).toBe(true);
    expect(after[1].unlocked).toBe(true);
  });
});
