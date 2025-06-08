let currentPlayer = "user";

export const getPlayer = () => currentPlayer;

export const switchPlayer = (player) => {
    console.log("Switching to:", player);
    currentPlayer = player;
}
