// Sample C# service with intentional issues for Claude review

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sample.Services
{
    public class OrderService
    {
        private readonly DbContext db;

        public OrderService(DbContext context)
        {
            db = context;
        }

        public Order getOrder(int id)
        {
            return db.Orders.FirstOrDefault(o => o.Id == id);
        }

        public async Task<List<Order>> GetOrdersForUser(int userId)
        {
            var orders = await db.Orders.Where(o => o.UserId == userId).ToListAsync();
            foreach (var order in orders)
            {
                order.Customer = db.Customers.FirstOrDefault(c => c.Id == order.CustomerId);
            }
            return orders;
        }

        public string BuildSummary(List<Order> orders)
        {
            string result = "";
            for (int i = 0; i < orders.Count; i++)
            {
                result += orders[i].Id + ", ";
            }
            return result;
        }

        public Order GetOrderSync(int id)
        {
            return GetOrderAsync(id).Result;
        }

        public async Task<Order> GetOrderAsync(int id)
        {
            try
            {
                return await db.Orders.FirstOrDefaultAsync(o => o.Id == id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public void DeleteOrder(int id)
        {
            var sql = "DELETE FROM Orders WHERE Id = " + id;
            db.Database.ExecuteSqlRaw(sql);
            Console.WriteLine("deleted " + id);
        }
    }

    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }

    public class Customer { public int Id { get; set; } }
    public class DbContext
    {
        public dynamic Orders { get; set; }
        public dynamic Customers { get; set; }
        public dynamic Database { get; set; }
    }
}
