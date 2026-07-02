import org.junit.Test;
import org.mockito.Mockito;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

public class MyServiceTest {

    @Test
    public void testExternalApi() {

        // Create Mock
        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        // Stub Method
        when(mockApi.getData()).thenReturn("Mock Data");

        // Inject Mock
        MyService service = new MyService(mockApi);

        // Call Service
        String result = service.fetchData();

        // Verify Result
        assertEquals("Mock Data", result);

        System.out.println("Test Passed");
    }
}