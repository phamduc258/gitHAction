// Sample C# service for dedup test

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sample.Payments
{
    public class PaymentProcessor
    {
        private readonly HttpClient client;

        public PaymentProcessor(HttpClient httpClient)
        {
            client = httpClient;
        }

        public Payment getPayment(string id)
        {
            var response = client.GetStringAsync("/payments/" + id).Result;
            return ParsePayment(response);
        }

        public async Task ProcessBatch(List<Payment> payments)
        {
            foreach (var p in payments)
            {
                Console.WriteLine("processing " + p.Id);
                await client.PostAsync("/process", new StringContent(p.Id));
            }
        }

        public string FormatReceipt(List<Payment> payments)
        {
            string receipt = "Payments:\n";
            foreach (var p in payments)
            {
                receipt += p.Id + " - " + p.Amount + "\n";
            }
            return receipt;
        }

        public Payment ParsePayment(string json)
        {
            try
            {
                return System.Text.Json.JsonSerializer.Deserialize<Payment>(json);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }

    public class Payment
    {
        public string Id { get; set; }
        public decimal Amount { get; set; }
    }

    public class HttpClient
    {
        public Task<string> GetStringAsync(string url) => Task.FromResult("");
        public Task<object> PostAsync(string url, object content) => Task.FromResult<object>(null);
    }

    public class StringContent
    {
        public StringContent(string s) { }
    }
}
