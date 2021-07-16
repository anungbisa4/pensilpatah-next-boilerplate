export const config = { amp: true };

function SampleAMP(props) {
  return (
    <amp-img
      width="300"
      height="300"
      src="/images/logo.png"
      alt="a cool image"
      layout="responsive"
    />
  );
}

export default SampleAMP;
