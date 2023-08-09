
export const changeDateForm = (string) => {
    const splitDate = string.split('.')
    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
}

export const trips = [
    {
        id: 1,
        city: "Berlin",
        from: '14.08.2023',
        to: '21.08.2023',
        imageUrl: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/berlin-c96f97c4ba.jpg'
    },
    {
        id: 2,
        city: "Paris",
        from: '11.08.2023',
        to: '16.08.2023',
        imageUrl: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/paris-0ae0bb626e.jpg'
    },
    {
        id: 3,
        city: "Stockholm",
        from: '15.08.2023',
        to: '24.08.2023',
        imageUrl: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/stockholm-a696fe73b4.jpg'
    },
    {
        id: 4,
        city: "Madrid",
        from: '09.08.2023',
        to: '13.08.2023',
        imageUrl: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/madrid-ee355b90b3.jpg'
    },
]


export const availableCities = [
    {
        id: 5,
        city: "Warsaw",
        imageUrl: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/warsaw-06c037d5b1.jpg'
    },
    {
        id: 6,
        city: "London",
        imageUrl: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/london-12fdfd9fcf.jpg'
    },
    {
        id: 7,
        city: "Dubai",
        imageUrl: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/dubai-89581487e2.jpg'
    },
    {
        id: 8,
        city: "Bucharest",
        imageUrl: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/bucharest-0baa0f5eaa.jpg'
    },
]

export const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
