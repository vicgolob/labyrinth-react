import styles from '../../styles/styles';

export const Character = (props) => {
  const {x, y} = props.position;
  return <div style={{
    ...styles.circle,
    left: x * 24 + 21,
    top: y * 24 + 21,
    position: 'absolute',
  }}></div>;
};
