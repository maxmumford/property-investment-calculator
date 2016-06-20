# config valid only for current version of Capistrano
lock '3.5.0'

set :application, 'property-investment-calculator'
set :repo_url, 'git@github.com:maxmumford/property-investment-calculator.git'

set :linked_files, fetch(:linked_files, []).push('config/secrets.json')
set :linked_dirs, fetch(:linked_dirs, []).push('node_modules')

namespace :deploy do

  desc 'Restart application'
  task :restart do
    invoke 'pm2:restart'
  end

  desc 'Install node modules'
  task :install_node_modules do
    on roles(:app) do
      within release_path do
        execute :npm, 'install', '-s'
      end
    end
  end

  desc 'Transpile TypeScripts'
  task :transpile do
    on roles(:app) do
      within release_path do
        execute :npm, 'run', 'tsc'
      end
    end
  end

  after :updated, :install_node_modules
  after :updated, :transpile
  after :publishing, :restart   

end  
