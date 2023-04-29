export interface Actividad {
    id?: string,
    name: string,
    description: string,
    image: string,
    location: string,
    city: string,
    location_map: string,
    category: string[],
    user_reviews: any[],
}