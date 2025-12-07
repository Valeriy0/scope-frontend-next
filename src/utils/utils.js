export const signMessage = async (signer, message) => {
  try {
    const encodedMessage = new window.TextEncoder().encode(message);
    const signature = await signer.signMessage(encodedMessage, 'utf8');
    return {
      signature,
    };
  } catch (error) {
    console.error('Error signing message:', error);
    return null;
  }
};
