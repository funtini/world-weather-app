export const forecastResponseAdapter = ({lat, lon, current, daily}) => {
    return {
        lat,
        lon,
        current: {
            temp: Math.round(current?.temp),
            feelsLike: Math.round(current?.feels_like),
            description: current?.weather?.[0].description,
            iconSrc: getImageSrc(current?.weather?.[0]?.icon)
        },
        forecast: daily?.filter((entry, idx) => idx !== 0)?.map((entry => {
            return {
                temp: Math.round(entry?.temp?.day),
                weekDay: weekDayConverter(entry?.dt),
                monthDay: numericDayConverter(entry?.dt),
                description: entry?.weather?.[0].description,
                iconSrc: getImageSrc(entry?.weather?.[0]?.icon)
            }
        }))
    }
}

export const weatherResponseAdapter = ({ coord, sys, name }) => {
    const countryCode = sys?.country;
    const id = `${name}-${countryCode}`;
    return {
        id,
        name,
        lat: coord?.lat,
        lon: coord?.lon,
        country: countryNameConverter(countryCode)
    }
}

export const locationResponseAdapter = (resp) => {
    const name = resp?.[0]?.name;
    const countryCode = resp?.[0]?.country;
    const id = `${name}-${countryCode}`;

    return {
        id,
        name,
        country: countryNameConverter(countryCode)
    }
}

const countryNameConverter = (countryCode) => {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode);
}

const weekDayConverter = (timestamp) => {
    return new Date(timestamp * 1000)
        .toLocaleDateString(
            "en-GB",
            {
                weekday: "long"
            }
        )
        .slice(0,3);
}

const numericDayConverter = (timestamp) => {
    return new Date(timestamp * 1000)
        .toLocaleDateString(
            "en-GB",
            {
                month: "numeric",
                day: "numeric"
            }
        );
}

const getImageSrc = (imageCode) => `http://openweathermap.org/img/wn/${imageCode}@2x.png`;
