// Kleine Komponente für ein einzelnes Listenelement.
// Den Namen bekommt sie als Prop von App (aus dem .map()).
// Den "key" sieht sie nicht – der ist nur für React selbst gedacht.
export default function Student({ name }) {
  return <li>{name} </li>;
}
