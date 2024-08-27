import "@/style/pages/toon.scss";

export default function page(props: any) {
  console.log(props.params);
  return <section className="toon">{props.params.id}</section>;
}
