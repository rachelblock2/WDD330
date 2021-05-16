export class Car {
    constructor(make, model, year, color) {
        this.CarId = Date.now(), //quick way to get random string of numbers
        this.Make = make,
        this.Model = model,
        this.Year = year,
        this.Color = color
        this.Available = true
    }
}

// this class becomes a module