import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingSpinner: React.FC<{
  size?: string | number;
  marginTop?: string | number;
}> = ({ size, marginTop }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: marginTop,
        position: 'absolute',
        top: '50%',
        left: '50%'
      }}
    >
      <CircularProgress disableShrink size={size || 80} color="primary"/>
    </div>
  );
};

export default LoadingSpinner;
