import nodeConfig from 'config';

interface Config {
  pactRdProfessionalApi:string;
  pactFeeAndPayApi:string;
}

const config: Config = {
  pactRdProfessionalApi: nodeConfig.get<string>('services.rdProfessionalApi'),
  pactFeeAndPayApi: nodeConfig.get<string>('services.feeAndPayApi'),
};

// export the config so that it can be used elsewhere.
export default config;
