export default interface IStorageProvider{
  saveFile(file:string): Promise<string>
  deleteFile(file:String): Promise<void>
}
