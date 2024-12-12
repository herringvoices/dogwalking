using dogwalking.Models;
using dogwalking.Models.DTOs;

// List of Walkers
List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "Alice" },
    new Walker { Id = 2, Name = "Bob" },
    new Walker { Id = 3, Name = "Charlie" },
    new Walker { Id = 4, Name = "Dana" },
    new Walker { Id = 5, Name = "Eve" },
};

// List of Cities
List<City> cities = new List<City>
{
    new City { Id = 1, Name = "New York" },
    new City { Id = 2, Name = "Los Angeles" },
    new City { Id = 3, Name = "Chicago" },
    new City { Id = 4, Name = "Houston" },
    new City { Id = 5, Name = "Phoenix" },
};

// List of Dogs
List<Dog> dogs = new List<Dog>
{
    new Dog
    {
        Id = 1,
        Name = "Buddy",
        CityId = 1,
        WalkerId = 1,
    },
    new Dog
    {
        Id = 2,
        Name = "Bella",
        CityId = 2,
        WalkerId = 3,
    },
    new Dog
    {
        Id = 3,
        Name = "Charlie",
        CityId = 3,
        WalkerId = null,
    },
    new Dog
    {
        Id = 4,
        Name = "Luna",
        CityId = 4,
        WalkerId = 2,
    },
    new Dog
    {
        Id = 5,
        Name = "Max",
        CityId = 5,
        WalkerId = 5,
    },
};

// List of WalkerCities
List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity
    {
        Id = 1,
        CityId = 1,
        WalkerId = 1,
    },
    new WalkerCity
    {
        Id = 2,
        CityId = 2,
        WalkerId = 2,
    },
    new WalkerCity
    {
        Id = 3,
        CityId = 3,
        WalkerId = 3,
    },
    new WalkerCity
    {
        Id = 4,
        CityId = 4,
        WalkerId = 4,
    },
    new WalkerCity
    {
        Id = 5,
        CityId = 5,
        WalkerId = 5,
    },
};

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet(
    "/api/dogs",
    () =>
    {
        return dogs.Select(item => new DogDTO
        {
            Id = item.Id,
            Name = item.Name,
            CityId = item.CityId,
            WalkerId = item.WalkerId,
        });
    }
);

app.Run();
