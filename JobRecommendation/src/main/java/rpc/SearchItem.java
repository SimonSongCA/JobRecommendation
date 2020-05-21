package rpc;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import db.MySQLConnection;
import entity.Item;
import external.GitHubClient;

/**
 * Servlet implementation class SearchItem
 */
public class SearchItem extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchItem() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String userId = request.getParameter("user_id");
		double lat = Double.parseDouble(request.getParameter("lat"));
		double lon = Double.parseDouble(request.getParameter("lon"));
		String keyword = request.getParameter("description");
		// Create a GitHub Client
		GitHubClient client = new GitHubClient();
		
		// items: raw GitHub result which includes all the primitive information
		// based on lat, lon, and default keywords(null).
		List<Item> items = client.search(lat, lon, keyword);
		
		
//		double lat = Double.parseDouble(request.getParameter("lat"));
//		double lon = Double.parseDouble(request.getParameter("lon"));
//		GitHubClient client = new GitHubClient();
//		RpcHelper.writeJsonArray(response, client.search1(lat, lon, null));

		
//		// build a connection with MySQL with current passwords, user name, DB_Instance, etc.
		MySQLConnection connection = new MySQLConnection();
//		// fetch the IDs of all the favorite items on MySQL and return as a Set<String>
		Set<String> favoritedItemIds = connection.getFavoriteItemIds(userId);
//		
//		// Close the connection to MySQL
		connection.close();
//		
//		// Set up a new JSONArray and write all the favorite items into it.
		JSONArray array = new JSONArray();
		for (Item item : items) {
			JSONObject obj = item.toJSONObject();
			obj.put("favorite", favoritedItemIds.contains(item.getItemId()));
			array.put(obj);
		}
		
		// update the response
		RpcHelper.writeJsonArray(response, array);
	}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
