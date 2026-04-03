namespace S5Server.Data;

/// <summary>
/// Represents the configuration settings required to connect to a database, including connection details,
/// authentication credentials, and command timeouts.
/// </summary>
/// <remarks>This class is typically used to encapsulate all necessary parameters for establishing and managing a
/// database connection within an application. It provides properties for specifying the host, port, database name, user
/// credentials, and additional connection options such as command and connection timeouts. The configuration can be
/// used to initialize database clients or connection pools. The constant ConfigKey can be used as a key for retrieving
/// configuration values from a configuration provider.</remarks>
public class DBConfig
{
    /// <summary>
    /// Represents the configuration key for the primary connection setting.
    /// </summary>
    public const string ConfigKey = "PrimaryConnection";
    /// <summary>
    /// Gets or sets the host name or IP address of the database server.
    /// </summary>
    public string DB_Host { get; set; } = "localhost";
    /// <summary>
    /// Gets or sets the username used to connect to the database.
    /// </summary>
    public string DB_Username { get; set; } = string.Empty;
    /// <summary>
    /// Gets or sets the password used to connect to the database.
    /// </summary>
    public string DB_Password { get; set; } = string.Empty;
    /// <summary>
    /// Gets or sets the name of the database.
    /// </summary>
    public string DB_Name { get; set; } = string.Empty;
    /// <summary>
    /// Gets or sets the network port number used to connect to the database.
    /// </summary>
    public int Port { get; set; } = 5432;
    /// <summary>
    /// Gets or sets the wait time, in seconds, before terminating an attempt to execute a command and generating an
    /// error.
    /// </summary>
    /// <remarks>A value of 0 indicates no limit, and the command will wait indefinitely. Setting this
    /// property to a negative value will throw an exception. Adjust this value based on expected command execution
    /// times and network conditions.</remarks>
    public int CommandTimeout { get; set; } = 600;
    /// <summary>
    /// Gets or sets the timeout value, in milliseconds, for the associated operation.
    /// </summary>
    /// <remarks>A value of 0 indicates that the operation does not time out. The default value is 1024
    /// milliseconds. Setting this property to a negative value other than -1 will throw an exception, unless otherwise
    /// specified by the implementation.</remarks>
    public int Timeout { get; set; } = 1024;
    /// <summary>
    /// CREATE SCHEMA core;        -- soldiers, units
    /// CREATE SCHEMA dict;        -- всі довідники
    /// CREATE SCHEMA docs;        -- шаблони, завдання
    /// CREATE SCHEMA history;     -- історія змін
    /// CREATE SCHEMA identity;    -- користувачі, ролі
    /// </summary>
    public string SearchPath {  get; set; } = "core,dict,docs,identity,history,public";
}
