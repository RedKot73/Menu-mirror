using Microsoft.AspNetCore.Http.HttpResults;

namespace S5Server.Data
{
    public class DBConfig
    {
        public const string ConfigKey = "PrimaryConnection";

        public string DB_Host { get; set; } = "localhost";
        public string DB_Username { get; set; } = string.Empty;
        public string DB_Password { get; set; } = string.Empty;
        public string DB_Name { get; set; } = string.Empty;

        public int Port { get; set; } = 5432;

        public int CommandTimeout { get; set; } = 600;
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
}
