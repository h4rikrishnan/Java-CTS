import org.junit.Test;
import org.mockito.Mockito;

import static org.mockito.Mockito.verify;

public class MyServiceTest {

    @Test
    public void testVerifyInteraction() {

        // Create Mock
        ExternalApi mockApi = Mockito.mock(ExternalApi.class);

        // Inject Mock
        MyService service = new MyService(mockApi);

        // Call Method
        service.fetchData();

        // Verify Interaction
        verify(mockApi).getData();

        System.out.println("getData() was called");
    }
}