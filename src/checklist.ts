import preval from 'preval.macro';

export interface Item {
  id: number;
  name: string;
  icon: string;
  count: number;
  description: string;
}

export interface Bundle {
  id: number;
  name: string;
  reward: string;
  items: Item[];
  items_required: number;
}

export interface Room {
  id: number;
  name: string;
  reward: string;
  bundles: Bundle[];
}


const checklist: Room[] = preval`
    const fs = require('fs');
    const data = fs.readFileSync(__dirname + '/assets/bundles.txt', 'utf8');
    const lines = data.split("\\n").filter(l => !!l.trimEnd());
    const rooms = [];

    function replaceIcon(name) {
        return name.replace(/['()]/g, '').replace(/[- ]/g, '_');
    }

    for (const line of lines) {
        if (!line.startsWith('  ')) {
            // Room data
            const [name, reward] = line.trim().split('/');
            const room = { name, reward, id: rooms.length + 1, bundles: [] };
            rooms.push(room);

        } else if (line.startsWith('  ') && !line.startsWith('    ')) {
            // Bundle data
            const [name, reward, items_required] = line.trim().split('/');
            const room = rooms[rooms.length - 1];
            const bundle = { name, reward, items_required: parseInt(items_required), id: room.id * 10 + room.bundles.length + 1, items: [] };
            room.bundles.push(bundle);

        } else if (line.startsWith('    ')) {
            // Item data
            let [name, description] = line.trim().split('/');
            let count = 1;
            if (name.includes(':')) {
                const parts = name.split(':');
                name = parts[0];
                count = parseInt(parts[1]);
            }
            const room = rooms[rooms.length - 1];
            const bundle = room.bundles[room.bundles.length - 1];
            const item = { name, description, icon: replaceIcon(name), id: bundle.id * 10 + bundle.items.length + 1, count };
            bundle.items.push(item);
        }
    }

    module.exports = rooms;
`;

export default checklist;