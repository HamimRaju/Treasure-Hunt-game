package TreasureHunt;
import java.util.Scanner;

public class TreasureHunt {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int[][] grid = {
            {0, 0, 0, 0},
            {0, 7, -1, 0},
            {0, 0, 10, 0},
            {0, -1, 0, 0}
        };

        int playerRow = 1;
        int playerCol = 1;
        int moves = 5;
        boolean gameOver = false;

        while (moves > 0 && !gameOver) {
            // Display grid
            for (int i = 0; i < grid.length; i++) {
                for (int j = 0; j < grid[i].length; j++) {
                    System.out.print(grid[i][j] + "\t");
                }
                System.out.println();
            }

            System.out.println("Moves left: " + moves);
            System.out.print("Enter move (U/D/L/R): ");
            char move = sc.next().toUpperCase().charAt(0);

            int newRow = playerRow;
            int newCol = playerCol;

            switch(move) {
                case 'U': newRow--; break;
                case 'D': newRow++; break;
                case 'L': newCol--; break;
                case 'R': newCol++; break;
                default: 
                    System.out.println("Invalid move! Use U/D/L/R.");
                    continue;
            }

            if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) {
                System.out.println("You moved outside the grid! Game Over.");
                gameOver = true;
                break;
            }

            if (grid[newRow][newCol] == -1) {
                System.out.println("You stepped on a mine! Game Over.");
                gameOver = true;
                break;
            } else if (grid[newRow][newCol] == 10) {
                System.out.println("Congratulations! You found the treasure!");
                gameOver = true;
                break;
            }

            grid[playerRow][playerCol] = 0;
            grid[newRow][newCol] = 7;
            playerRow = newRow;
            playerCol = newCol;
            moves--;
        }

        if (!gameOver) {
            System.out.println("Out of moves! You lost.");
        }

        sc.close();
    }
}
