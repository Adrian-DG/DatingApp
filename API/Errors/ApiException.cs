namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int statusCode, string message = null, string deatils = null) 
        {
            this.StatusCode = statusCode;
            this.Message = message;
             this.Deatils = deatils;
        }
                
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Deatils { get; set; }
    }
}