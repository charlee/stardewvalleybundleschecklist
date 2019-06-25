import React from 'react';
import codegen from 'codegen.macro';

codegen`
    const glob = require('glob');
    const files = glob.sync('src/assets/icons/*.png');

    module.exports = files.map(
        file => {
            const path = file.replace(/^src/, '.');
            const varname = file.replace(/^.*\\//, '').replace(/.png$/, '');

            return "import " + varname + " from '" + path + "'";
        }
    ).join(';\\n') + ';\\n';
`;

const mappings = codegen`
    const glob = require('glob');
    const files = glob.sync('src/assets/icons/*.png');

    module.exports = '({\\n' + files.map(file => file.replace(/^.*\\//, '').replace(/.png$/, '')).join(',\\n') + '})\\n';
`;

export interface IProps {
  name: string;
}

const Icon: React.FC<IProps> = props => {
  return (
    <div>
      <img src={mappings[props.name]} alt={props.name} />
    </div>
  );
};

export default Icon;
