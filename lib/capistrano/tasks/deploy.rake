namespace :node do

  desc 'Install node modules'
  task :install do
    on roles(:app) do
      within release_path do
        execute :npm, 'install', '-s'
      end
    end
  end

end

namespace :typescript do

  desc 'Transpile TypeScripts'
  task :transpile do
    on roles(:app) do
      within release_path do
        execute :npm, 'run', 'tsc'
      end
    end
  end

end

namespace :pm2 do

  desc 'Recreate pm2 app'
  task :recreate do
    on roles(:app) do
      within release_path do
        execute :pm2, 'delete', fetch(:pm2_app_name)
        execute :pm2, 'start', fetch(:pm2_config)
      end
    end
  end

end
