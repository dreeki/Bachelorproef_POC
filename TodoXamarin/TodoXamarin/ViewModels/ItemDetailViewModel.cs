using System;

using TodoXamarin.Models;

namespace TodoXamarin.ViewModels
{
    public class ItemDetailViewModel : BaseViewModel
    {
        public TodoItem Item { get; set; }
        public ItemDetailViewModel(TodoItem item = null)
        {
            Title = item?.Author;
            Item = item;
        }
    }
}
