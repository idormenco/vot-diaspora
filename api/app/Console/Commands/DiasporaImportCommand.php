<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use App\Models\Location;

class DiasporaImportCommand extends Command {

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'diaspora:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Import csv Locations";

    protected $source = 'https://docs.google.com/spreadsheets/d/1MDe9I8UbwNrDYUwHqOjLjf5nGg1YA673QHdUH2LltzI/export?format=csv&id=1MDe9I8UbwNrDYUwHqOjLjf5nGg1YA673QHdUH2LltzI&gid=0';

    const K_REGION  = 0;
    const K_COUNTRY = 1;
    const K_CITY    = 2;
    const K_ADDRESS = 3;
    const K_TYPE    = 4;
    const K_RELATED = 5;

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {

        $temp = storage_path().'/locations.csv';

        if(!file_exists($temp)){
            $file = fopen($temp, 'w');
            fwrite($file, file_get_contents($this->source)  );
            fclose($file);
        }

        $csvObj = new \mnshankar\CSV\CSV();
        $data   = $csvObj->fromFile($temp, true)->toArray();

        $keys   = array_keys($data[0]);

        $data = array_slice($data, 3, 1);

        foreach($data as $location){
            try {
                $search = $location[ $keys[self::K_ADDRESS]] .", ". $location[ $keys[self::K_COUNTRY]];
                $adr    = urlencode( $search );
                $url    = "http://maps.google.com/maps/api/geocode/json?address=$adr&sensor=false";
                $marker = json_decode( file_get_contents($url));

                if($marker->status == 'OK'){

                    $obj = [
                        // geocode fields
                        'lat'     => $marker->results[0]->geometry->location->lat,
                        'lan'     => $marker->results[0]->geometry->location->lng,
                        'address' => $marker->results[0]->formatted_address ,

                        // csv fields
                        'city'    => $location[ $keys[self::K_CITY]],
                        'country' => $location[ $keys[self::K_COUNTRY]],
                        'type'    => $location[ $keys[self::K_TYPE]],
                        'region'  => $location[ $keys[self::K_REGION]],
                        'related' => $location[ $keys[self::K_RELATED]]
                    ];
                    \Log::info('imported ok: '.$search);
                    \Log::info(json_encode($search));
                    Location::create($obj);
                } else{
                    \Log::info('missing response for: '.$search);

                    \Log::info( json_encode($marker) );
                    die;
                }

            } catch (\Exception $e) {
                // No exception will be thrown here
                echo $e->getMessage();
            }

        }
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return array(
        );
    }

}