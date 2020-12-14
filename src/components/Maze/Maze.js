import styles from '../../styles/styles';

export const Maze = (props) => {
  const {mazeSerial} = props;
  return (
    <table style={{...styles.padding, position: 'absolute'}} cellSpacing='0'>
      <tbody>
        {mazeSerial.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {Array.from(row).map((char, charIndex) => {
                const key = `${rowIndex}-${charIndex}`;
                switch (char) {
                case 'P':
                  return <td style={styles.open} key={key} />;
                case 'W':
                  return <td style={styles.edge} key={key} />;
                case 'S':
                  return <td style={styles.start} key={key} />;
                case 'F':
                  return <td style={styles.end} key={key} />;
                default:
                  return <td style={styles.unknown} key={key} />;
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
