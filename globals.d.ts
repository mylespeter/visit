// Ou plus simplement pour les imports à effet secondaire
declare module '*.css' {
  const content: any;
  export default content;
}