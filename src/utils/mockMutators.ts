// src/utils/mockMutators.ts
export const mockVerifyClaim = (claimId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Simulated verification for claim ${claimId}`);
        resolve();
      }, 1000);
    });
  };