export default interface IMailProvider {
  sendMail(to: string, body: string): Provider<void>;
}
