import { Stepper, Step } from 'headless-stepper/components';

const StepIndicator = ({ index, title, icon }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100px',
        marginTop: '40px',
      }}
    >
      <div
        style={{
          justifyContent: 'center',
          marginRight: '10px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          color: 'white',
          backgroundColor: 'black',
          display: 'flex',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        {index + 1}
      </div>
      <span
        style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
      >
        {icon}
        <span style={{ marginLeft: '5px' }}>{title}</span>
      </span>
    </div>
  );
};
const CustomStepper = ({ steps = [] }) => {
  return (
    <Stepper currentStep={0}>
      {steps.map((step, index) => (
        <Step
          as={StepIndicator}
          index={index}
          icon={step.icon}
          key={index}
          title={step.title}
          label={''}
        >
          {step.content}
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomStepper;
