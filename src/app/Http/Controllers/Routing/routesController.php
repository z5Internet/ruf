<?php namespace z5internet\ReactUserFramework\App\Http\Controllers\Routing;

use z5internet\ReactUserFramework\App\Http\Controllers\Controller;

use z5internet\ReactUserFramework\App\Http\Controllers\User\UserController;

use z5internet\ReactUserFramework\App\Http\Controllers\ContactController;

use z5internet\ReactUserFramework\App\Http\Controllers\StartController;

use z5internet\ReactUserFramework\App\Http\Controllers\ReferralsController;

use z5internet\ReactUserFramework\App\Http\Controllers\Image\ImageController;

use z5internet\ReactUserFramework\App\Http\Controllers\ErrorLogController;

use z5internet\ReactUserFramework\App\Http\Controllers\PushController;

use z5internet\ReactUserFramework\App\Http\Controllers\AssetController;

use z5internet\ReactUserFramework\App\Http\Controllers\uiNotificationsController;

use Illuminate\Http\Request;

use z5internet\ReactUserFramework\App\Http\Controllers\User\ForgotPasswordController;

use z5internet\ReactUserFramework\App\Http\Controllers\Image\UploadImageController;

use z5internet\ReactUserFramework\App\Http\Controllers\Auth\AuthenticationController;

class routesController extends Controller
{

	public function __construct(Request $request) {

		$this->request = $request;

	}

	public function start() {

		return ['data' => (new StartController)->show()];

	}

	public function login() {

		$user = UserController::login($this->request);

		$response = response('', 200);

		if (!$user) {

			return ['data' => []];

		}

		$st = (new StartController)->show($user->id)['user'];

        $response->withCookie((new AuthenticationController($this->request))->cookie($user->token));

		$response->setContent(collect(['data' => ['user' => $st]]));

        return $response;

	}

	public function join() {

        $data = $this->request->only('first_name', 'email');

		$data["ref"] = $this->request->cookie('sou');

		$j = UserController::joinFromSignupForm($data);

		if (isset($j['errors'])) {

			return ['errors' => $j['errors'], 'data' => []];

		}

		return ['data' => $j];

	}

	public function referer($refer) {

		$sou = [
			'r' => array_get($_SERVER, 'HTTP_REFERER'),
			'u' => $refer,
		];

		$response = new \Illuminate\Http\Response(file_get_contents(public_path('assets/index.html')));

		$response->withCookie(cookie('sou', json_encode($sou), 60*24*30));

		return $response;

	}

	public function logoutWithRedirect() {

        return redirect('/login')->cookie((new AuthenticationController($this->request))->cookie(false));

	}

	public function staticData() {

		return UserController::showStaticData();

	}

	public function contactUs() {

		$data = $this->request->only('name','email','message');

		return (new ContactController)->contactUs($data);

	}

	public function getImage($img) {

		return (new ImageController)->get($img);

	}

	public function createImage($img) {

		return (new ImageController)->create($img);

	}

	public function referals() {

		return (new ReferralsController)->show();

	}

	public function logError() {

		$data = $this->request->only('stacktrace', 'url', 'uid', 'type');

		(new ErrorLogController)->LogError($data);

		return ['data' => []];

	}

	public function push(PushController $PushController) {

		$args = $this->request->only('c', 'p', 'l');

		return ['data' => $PushController->get($args)];

	}

	public function uiNotifications() {

		$uid = app('auth')->id();

		return [
			'data' => (new uiNotificationsController)->showNotifications($uid),
		];

	}

	public function markUiNotificationAsRead($nid) {

		$uid = app('auth')->id();

		return [
			'data' => [
				'uiNotifications' => (new uiNotificationsController)->markUiNotificationAsRead($nid, $uid),
			],
		];

	}

	public function getAsset($dir, $file) {

		return (new AssetController)->getAsset($dir, $file);

	}

	public function sendPasswordResetEmail(Request $request) {

		(new ForgotPasswordController)->sendResetLinkEmail($request->input('email'));
		return ['data' => []];

	}

/**
	public function sendResetLinkEmail() {

		$data = $this->request->only('email', );

		return UserController::sendResetLinkEmail($data);

	}
**/

	public function resetPassword(Request $request) {

		$data = $request->only(['email', 'token', 'password', 'password_confirmation']);

		$result = (new ForgotPasswordController)->reset($data);

		if ($result == 'reset') {

			return ['data' => []];

		}

		$error = '';

		switch($result) {

			case 'invalid_password':

				$error = 'There was a problem changing your password. Check your password matches.';

				break;

			case 'invalid_token_email':

				$error = 'There was a problem changing your password. Please check your email address is typed correctly. If you are still having problems try requesting another password reset email.';

				break;

			default:

				$error = 'There was a problem changing your password.';
		}

		return ['errors' => [['message' => $error]], 'data' => []];

	}

	public function uploadImageChunk(Request $request) {

		return ['data' => [

			'uploaded' => (new uploadImageController)->uploadChunk($this->getImageSliceParams($request)),
			'feed' => [],

		]];

	}

	public function checkImageChunkAlreadytUploaded(Request $request) {

		return ['data' => [

			'uploaded' => (new uploadImageController)->checkIfUploadedChunkExists($this->getImageSliceParams($request)),

		]];

	}

	private function getImageSliceParams(Request $request) {

		$filename = $request->input('filename');
		$chunk = $request->input('chunk');
		$start = $request->input('start');
		$end = $request->input('end');

		return [
			'filename' => $filename,
			'chunk' => $chunk,
			'start' => $start,
			'end' => $end,
			'uid' => app('auth')->id(),
		];

	}

}
