export default [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_contractName',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_defaultAddr',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'logId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'LogStored',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'fileId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'fileStored',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'accessor',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'contractName',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_fileId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: '_fileName',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_size',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_date',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: '_ip_address',
        type: 'bytes32',
      },
    ],
    name: 'setFile',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_logId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_logFileId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_content',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: '_dateCreated',
        type: 'uint256',
      },
    ],
    name: 'setLogs',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getFiles',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '_fId',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes32[]',
        name: '_fName',
        type: 'bytes32[]',
      },
      {
        internalType: 'bytes32[]',
        name: '_fSize',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint256[]',
        name: '_fDate',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes32[]',
        name: '_fIpAddress',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint256[]',
        name: '_flogCount',
        type: 'uint256[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'fileId',
        type: 'uint256',
      },
    ],
    name: 'getLogData',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '_logSn',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '_dateCreated',
        type: 'uint256[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'fileId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'logId',
        type: 'uint256',
      },
    ],
    name: 'getLogs',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'fakeFunction',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
