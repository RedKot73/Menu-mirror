namespace S5Server.Data
{
    public class DBConfig
    {
        public const string ConfigKey = "PrimaryConnection";

        public string Host { get; set; } = ".\\Database\\S5_DB.sqlite";
    }
}
