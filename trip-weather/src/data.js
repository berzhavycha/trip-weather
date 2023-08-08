export const getImage = async (cityName) => {
    const data = await (await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityName.toLowerCase()}/images`)).json()
    return data.photos[0].image.mobile
}

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
        imageUrl: await getImage('Berlin')
    },
    {
        id: 2,
        city: "Paris",
        from: '11.08.2023',
        to: '16.08.2023',
        imageUrl: await getImage('Paris')
    },
    {
        id: 3,
        city: "Stockholm",
        from: '15.08.2023',
        to: '24.08.2023',
        imageUrl: await getImage('Stockholm')
    },
    {
        id: 4,
        city: "Madrid",
        from: '09.08.2023',
        to: '13.08.2023',
        imageUrl: await getImage('Madrid')
    },
]

// localStorage.setItem("trips", JSON.stringify(trips))


export const availableCities = [
    {
        id: 5,
        city: "Warsaw",
        imageUrl: await getImage('Warsaw')
    },
    {
        id: 6,
        city: "London",
        imageUrl: await getImage('London')
    },
    {
        id: 7,
        city: "Dubai",
        imageUrl: await getImage('Dubai')
    },
    {
        id: 8,
        city: "Bucharest",
        imageUrl: await getImage('Bucharest')
    },
]

export const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
