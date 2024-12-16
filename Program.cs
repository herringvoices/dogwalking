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
    new City { Id = 2, Name = "Old York" },
    new City { Id = 3, Name = "Mid York" },
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
        CityId = 1,
        WalkerId = 4,
    },
    new WalkerCity
    {
        Id = 5,
        CityId = 2,
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

app.MapGet(
    "/api/walkers",
    () =>
    {
        return walkers.Select(item => new WalkerDTO { Id = item.Id, Name = item.Name });
    }
);

app.MapGet(
    "/api/cities",
    () =>
    {
        return cities.Select(item => new CityDTO { Id = item.Id, Name = item.Name });
    }
);

app.MapGet(
    "/api/walkercities",
    () =>
    {
        return walkerCities.Select(item => new WalkerCityDTO
        {
            Id = item.Id,
            CityId = item.CityId,
            WalkerId = item.WalkerId,
        });
    }
);

//POST

app.MapPost(
    "/api/dogs",
    (DogDTO newDog) =>
    {
        // Create a new Dog object from the received DogDTO
        var dog = new Dog
        {
            Id = dogs.Max(d => d.Id) + 1, // Generate a new Id
            Name = newDog.Name,
            CityId = newDog.CityId,
            WalkerId = newDog.WalkerId,
        };

        // Add the new Dog to the list
        dogs.Add(dog);

        // Return the added Dog as a DogDTO
        return Results.Created(
            $"/api/dogs/{dog.Id}",
            new DogDTO
            {
                Id = dog.Id,
                Name = dog.Name,
                CityId = dog.CityId,
                WalkerId = dog.WalkerId,
            }
        );
    }
);

app.MapPost(
    "/api/walkercities",
    (WalkerCityDTO newWalkerCity) =>
    {
        // Create a new WalkerCity object from the received DTO
        var walkerCity = new WalkerCity
        {
            Id = walkerCities.Max(wc => wc.Id) + 1, // Generate a new Id
            WalkerId = newWalkerCity.WalkerId,
            CityId = newWalkerCity.CityId,
        };

        // Add the new WalkerCity to the list
        walkerCities.Add(walkerCity);

        // Return the added WalkerCity as a WalkerCityDTO
        return Results.Created(
            $"/api/walkercities/{walkerCity.Id}",
            new WalkerCityDTO
            {
                Id = walkerCity.Id,
                WalkerId = walkerCity.WalkerId,
                CityId = walkerCity.CityId,
            }
        );
    }
);
app.MapPost(
    "/api/cities",
    (CityDTO newCity) =>
    {
        // Create a new City object from the received DTO
        var city = new City
        {
            Id = cities.Max(c => c.Id) + 1, // Generate a new Id
            Name = newCity.Name,
        };

        // Add the new City to the list
        cities.Add(city);

        // Return the added City as a CityDTO
        return Results.Created(
            $"/api/cities/{city.Id}",
            new CityDTO { Id = city.Id, Name = city.Name }
        );
    }
);

//DELETE

app.MapDelete(
    "/api/dogs/{dogId}",
    (int dogId) =>
    {
        // Find the dog by ID
        Dog dog = dogs.FirstOrDefault(d => d.Id == dogId);

        if (dog == null)
        {
            // Return 404 Not Found if the dog doesn't exist
            return Results.NotFound($"Dog with ID {dogId} not found.");
        }

        // Remove the dog from the list
        dogs.Remove(dog);

        // Return 204 No Content to indicate successful deletion
        return Results.NoContent();
    }
);

app.MapDelete(
    "/api/walkers/{walkerId}",
    (int walkerId) =>
    {
        // Find the walker by ID
        Walker walker = walkers.FirstOrDefault(w => w.Id == walkerId);

        if (walker == null)
        {
            // Return 404 Not Found if the walker doesn't exist
            return Results.NotFound($"Walker with ID {walkerId} not found.");
        }

        // Remove the walker from the list
        walkers.Remove(walker);

        // Return 204 No Content to indicate successful deletion
        return Results.NoContent();
    }
);

app.MapDelete(
    "/api/cities/{cityId}",
    (int cityId) =>
    {
        // Find the city by ID
        City city = cities.FirstOrDefault(c => c.Id == cityId);

        if (city == null)
        {
            // Return 404 Not Found if the city doesn't exist
            return Results.NotFound($"City with ID {cityId} not found.");
        }

        // Remove the city from the list
        cities.Remove(city);

        // Return 204 No Content to indicate successful deletion
        return Results.NoContent();
    }
);

app.MapDelete(
    "/api/walkercities/{id}",
    (int id) =>
    {
        // Find the WalkerCity object with the given Id
        WalkerCity walkerCity = walkerCities.FirstOrDefault(wc => wc.Id == id);

        if (walkerCity == null)
        {
            // If no matching object is found, return NotFound
            return Results.NotFound($"WalkerCity with ID {id} not found.");
        }

        // Remove the WalkerCity object from the list
        walkerCities.Remove(walkerCity);

        // Return NoContent to indicate successful deletion
        return Results.NoContent();
    }
);

//PUT
app.MapPut(
    "/api/walkers/{id}",
    (int id, WalkerDTO updatedWalker) =>
    {
        // Find the existing walker
        Walker existingWalker = walkers.FirstOrDefault(w => w.Id == id);

        if (existingWalker == null)
        {
            return Results.NotFound($"Walker with ID {id} not found.");
        }

        // Update the walker's properties
        existingWalker.Name = updatedWalker.Name;

        // Return the updated walker as a DTO
        return Results.Ok(new WalkerDTO { Id = existingWalker.Id, Name = existingWalker.Name });
    }
);

app.MapPut(
    "/api/dogs/{id}",
    (int id, DogDTO updatedDog) =>
    {
        // Find the existing dog
        Dog existingDog = dogs.FirstOrDefault(d => d.Id == id);

        if (existingDog == null)
        {
            return Results.NotFound($"Dog with ID {id} not found.");
        }

        // Update the dog's properties
        existingDog.Name = updatedDog.Name;
        existingDog.CityId = updatedDog.CityId;
        existingDog.WalkerId = updatedDog.WalkerId;

        // Return the updated dog as a DTO
        return Results.Ok(
            new DogDTO
            {
                Id = existingDog.Id,
                Name = existingDog.Name,
                CityId = existingDog.CityId,
                WalkerId = existingDog.WalkerId,
            }
        );
    }
);

app.Run();
