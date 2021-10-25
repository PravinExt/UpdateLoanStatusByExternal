var aws = require('aws-sdk')
const StateMachineArn = process.env.StateMachineArn;

exports.handler = (event, context, callback) => {

  event.LoanApplication_Status = 8;
  event.LoanApplication_BankerComment = "ClosedByExternalService";
  
  const x = JSON.stringify(event);
  let jsonFormattedString = x.replace("\\", "");
  
  
  var params = {
    stateMachineArn: StateMachineArn,
    input: JSON.stringify(jsonFormattedString)
  };
  var stepfunctions = new aws.StepFunctions()
  stepfunctions.startExecution(params, (err, data) => {
    if (err) {
    console.log(err);
    const response = {
        statusCode: 500,
        body: JSON.stringify({
        message: 'There was an error'
        })
    };
    callback(null, response);
    } else {
    console.log(data);
    const response = {
        statusCode: 200,
        body: JSON.stringify({
        message: 'Step function worked'
        })
    };
    callback(null, response);
    }
});
}