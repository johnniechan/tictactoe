#
# Import the packages required for Ruby and Java
#
%w{rubygems bundler/setup sinatra json}.each{|r|require r}

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
  return [200, header, body]
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

post '/api/opp_move' do
  jsonstr = request.env["rack.input"].read
  request_data = JSON.parse(jsonstr);
  puts request_data
  if request_data.has_key?("ai_type")
      ai_type = request_data["ai_type"]
  else
      ai_type = 0
  end 


  puts "ai type: #{ai_type}"
  
  board = request_data["board"]
  player = request_data["who"]

  response_data = Hash.new
  response_data["valid_move"] = false
  response_data["who"] = player

  if ai_type == 0 then
    puts "Ai #0"
    count = 0
    board.each{ |val| count = count + ((val == 'n')?1:0)}
    puts count
    if count != 0 then
      v = rand(count)
      puts "Seek Box ##{v}"
        
      for i in 0..8 do
        if board[i] == "n" then
          if v == 0 then
            response_data["valid_move"] = true
            response_data["move"] = i
            break
          else
            v -= 1
          end
        end
      end
        
    end
  end

  return [200, JSON.generate(response_data)]
end
