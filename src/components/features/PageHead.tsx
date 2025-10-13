interface PropsType {
  title?: string;
}

const PageHead = (props: PropsType) => {
  const { title = "Acara" } = props;

  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
    </head>
  );
};

export default PageHead;
