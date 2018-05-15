using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using TodoXamarin.Models;

[assembly: Xamarin.Forms.Dependency(typeof(TodoXamarin.Services.MockDataStore))]
namespace TodoXamarin.Services
{
	public class MockDataStore : IDataStore<TodoItem>
    {
        List<TodoItem> items;

        public MockDataStore()
        {
            items = new List<TodoItem>();
            var mockItems = new List<TodoItem>
            {
				new TodoItem { Id = Guid.NewGuid().ToString(), Author = "First item", Message="This is an item description." },
				new TodoItem { Id = Guid.NewGuid().ToString(), Author = "Second item", Message="This is an item description." },
				new TodoItem { Id = Guid.NewGuid().ToString(), Author = "Third item", Message="This is an item description." },
				new TodoItem { Id = Guid.NewGuid().ToString(), Author = "Fourth item", Message="This is an item description." },
				new TodoItem { Id = Guid.NewGuid().ToString(), Author = "Fifth item", Message="This is an item description." },
				new TodoItem { Id = Guid.NewGuid().ToString(), Author = "Sixth item", Message="This is an item description." },
            };

            foreach (var item in mockItems)
            {
                items.Add(item);
            }
        }

        public async Task<bool> AddItemAsync(TodoItem item)
        {
            items.Add(item);

            return await Task.FromResult(true);
        }

        public async Task<bool> UpdateItemAsync(TodoItem item)
        {
            var _item = items.Where((TodoItem arg) => arg.Id == item.Id).FirstOrDefault();
            items.Remove(_item);
            items.Add(item);

            return await Task.FromResult(true);
        }

        public async Task<bool> DeleteItemAsync(string id)
        {
			var _item = items.FirstOrDefault((TodoItem arg) => arg.Id == id);
            items.Remove(_item);

            return await Task.FromResult(true);
        }

        public async Task<TodoItem> GetItemAsync(string id)
        {
            return await Task.FromResult(items.FirstOrDefault(s => s.Id == id));
        }

        public async Task<IEnumerable<TodoItem>> GetItemsAsync(bool forceRefresh = false)
        {
            return await Task.FromResult(items);
        }
    }
}