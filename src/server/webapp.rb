#
# Import the packages required for Ruby and Java
#
%w{rubygems bundler/setup sinatra}.each{|r|require r}

# Configuration option that allows changes without restarting server - sometimes :)
configure {Sinatra::Application.reset!; use Rack::Reloader}

#
#  This block is executed prior to each HTTP call (like a servlet filter)
#
before do
  @sys_path = File.dirname(__FILE__)
end


get '/hi' do
  "Hello, World!"
end


get '/ttt.html' do
end

post '/ttt.html' do
  body_file = File.open(@sys_path + '/public/ttt.html', 'rb')
  body = body_file.read

  h = Array.new(9) {|index| 'n'}
  puts params.to_s
  params.each { |key, val| h[key.to_i] = val}


  count = 0

  params.each{ |key, val| count = count + ((val == 'n')?1:0)}
  puts count
  
  if count != 0 
    begin
      v = rand(9)
      puts "Selected #{v}"
    end while params[v.to_s] != 'n'
  end
  params[v.to_s] = 'X'

  sub_str = "<script>"
  sub_str = sub_str + "gamestate = ["
  params.each { |key, val| sub_str = sub_str + "'" + val + "', "}
  sub_str = sub_str + "];"

  sub_str = sub_str + "</script>"
  body.gsub!(/<!--REPLACE-->/, sub_str);
  
  header = {'move' => v.to_s}
  header.merge!(params)
  return [201, header, body]
end

get '/how' do
  stream do |out|
    out << "It's gonna be legen -\n"
    sleep 0.5
    out << " (wait for it) \n"
    sleep 1
    out << "- dary!\n"
  end
end


get '/*' do
  redirect '/ttt.html'
end
