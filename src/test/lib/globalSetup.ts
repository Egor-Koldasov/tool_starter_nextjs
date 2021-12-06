import { loadEnvConfig } from '@next/env'
import path from 'path';

export default async function () {
  loadEnvConfig(path.resolve(__dirname, '../../../'));
}