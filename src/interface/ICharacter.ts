interface ICharacters {
    id: string;
    name: string;
    description: string;
    image: string;
    comics:IComic[];
}
interface IComic {
    id: string;
    title: string;
}
export default ICharacters;