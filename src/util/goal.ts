import { BASE_URL } from '../vars';


export const setGoal = async (username: string, goalType: string, target: number, field: string, timeSpan: string) => {
  try {
    const response = await fetch(`${BASE_URL}/goal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, goalType, target, field, timeSpan }),
    });

    if (!response.ok) {
      throw new Error('Failed to set the goal');
    }
  } catch (error) {
    console.error('Error setting goal:', error);
    throw error;
  }
};
