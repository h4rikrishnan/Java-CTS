import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class BankAccountTest {

    private int balance;

    @Before
    public void setUp() {
        balance = 1000;
        System.out.println("Setup: Account created with balance = " + balance);
    }

    @Test
    public void testWithdraw() {

        // Arrange
        int withdrawAmount = 200;

        // Act
        balance = balance - withdrawAmount;

        // Assert
        assertEquals(800, balance);

        System.out.println("Withdrawal successful");
    }

    @After
    public void tearDown() {
        System.out.println("Teardown: Test completed");
    }
}