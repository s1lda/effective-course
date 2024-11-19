interface IComics {
    id: string;
    name: string;
    description: string;
    image: string;
    characters:ICharacter[];
}
interface ICharacter{
    id:string;
    name:string;
}
export default IComics;